import Lead from '../models/lead.model';
import nodemailer from 'nodemailer';
import { createNotification } from './notificationController';
import { logAction } from './loggerController';

// des : Get all leads
//route : Get /api/v1/leads
// access : private

const getLeads = async (req, res) => {

    try {

        const leads = await Lead.find({ organization: req.organizationId });
        res.json(leads);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// des : create a leads
//route : Post /api/v1/leads
//access : Private

const createLead = async (req, res) => {
    try {

        const lead = await Lead.create({
            ...req.body,
            organization: req.organizationId,
        });
        res.status(201).json(lead);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//des : score lead with AI
//route : Post /api/v1/leads/:id/score
//access : Private

const scoreLead = async (req, res) => {
    try {

        const lead = await Lead.findById(req.param.id);

        if (!lead || lead.organization.toString() !== req.organizationId) {
            return res.status(404).json({ message: 'Lead not Found ' });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ message: 'Gemini API key not configured !' });

        }

        const prompt = `Analyze these sales lead notes and determine a sales intent score (0-100). Return strictly valid JSON with no markdown formatting. Format:
    { "score": number, "reasoning": "string" }
    Notes: "${lead.notes || 'No notes provided.'}"`;

    const url=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url,{
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({
            contents:[{parts:[{text:prompt}]}]
        })
    });

    const data=await response.json();

    if(data.error){
        throw new Error(data.error.message);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // Clean up markdown code blocks if present 

    const jsonStr= text.replace(/```json/g,'').replace(/```/g,'').trim();
    const result=JSON.parse(jsonStr);

    lead.aiScore = result.score;
    leads.aiAnalysis = result.reasoning;
    await lead.save();

    res.json(lead);


    } catch (error) {
        console.error('AI Score Error : ', error);
        res
            .status(500)
            .json({
                message: 'AI Scoring Failed : ' + error.message
            })
    }
}

// des : Draft cold email with AI
// route: POST /api/v1/leads/:id/email
//access : Private

const draftEmail = async(req,res)=>{
    try {

        const lead = await Lead.findById(req.param.id);

        if(!lead || lead.organization.toString() !== req.organizationId){
            return res.status(404).json({ message:'Lead not Found'});
        }

         const apiKey = process.env.GEMINI_API_KEY;
        const prompt = `Write a short, professional cold outreach email to ${lead.firstName} ${lead.lastName}. 
    Context: They are a potential client. 
    Notes about them: "${lead.notes || 'No specific notes'}".
    My Company: "${req.user.organization?.name || 'Our Company'}".
    Goal: Schedule a meeting.
    Return strictly JSON: { "subject": "string", "body": "string" }`;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                contents:[{ parts: [{ text:prompt }]}]
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        const jsonStr = text.replace(/```json/g,'').replace(/```/g,'').trim();
        const result=JSON.parse(jsonStr);

        res.json(result);
        
    } catch (error) {
        console.error('AI Email Error : ',error);
        res.status(500).json({message:'AI Email Failed '});
    }
};