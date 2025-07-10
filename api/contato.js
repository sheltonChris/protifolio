import nodemailer from 'nodemailer';
import 'dotenv/config'; 


export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nome, email, telefone, disc } = req.body;

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        try {
            await transporter.sendMail({
                from: `"Contato Site" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: 'Novo contato do site',
                text: `
            Nome: ${nome}
            Email: ${email}
            Telefone: ${telefone}
            Mensagem: ${disc}
        `,
                html: `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Mensagem:</strong> ${disc}</p>
        `
            });

            res.status(200).json({ mensagem: 'E-mail enviado com sucesso!' });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ mensagem: 'Erro ao enviar e-mail.' });
        }
    } else {
        res.status(405).json({ mensagem: 'Método não permitido.' });
    }
}
