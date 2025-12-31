import { resend } from './client';

interface TicketNotificationProps {
    to: string;
    userName: string;
    ticketTitle: string;
    ticketId: string;
    type: 'CREATED' | 'UPDATED' | 'ASSIGNED';
    status?: string;
}

export async function sendTicketNotification({
    to,
    userName,
    ticketTitle,
    ticketId,
    type,
    status,
}: TicketNotificationProps) {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is not set. Email notification skipped.');
            return;
        }

        let subject = '';
        let html = '';

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const ticketUrl = `${baseUrl}/dashboard/tickets/${ticketId}`;

        switch (type) {
            case 'CREATED':
                subject = `নতুন টিকেট তৈরি হয়েছে: ${ticketTitle}`;
                html = `
          <div>
            <h1>হ্যালো ${userName},</h1>
            <p>একটি নতুন টিকেট তৈরি হয়েছে।</p>
            <p><strong>টিকেট:</strong> ${ticketTitle}</p>
            <p><strong>আইডি:</strong> #${ticketId}</p>
            <br/>
            <a href="${ticketUrl}" style="background-color: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">টিকেট দেখুন</a>
          </div>
        `;
                break;
            case 'UPDATED':
                subject = `টিকেট আপডেট: ${ticketTitle}`;
                html = `
          <div>
            <h1>হ্যালো ${userName},</h1>
            <p>আপনার টিকেট আপডেট করা হয়েছে।</p>
            <p><strong>টিকেট:</strong> ${ticketTitle}</p>
            <p><strong>স্ট্যাটাস:</strong> ${status}</p>
            <br/>
            <a href="${ticketUrl}" style="background-color: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">টিকেট দেখুন</a>
          </div>
        `;
                break;
        }

        if (subject && html) {
            await resend.emails.send({
                from: 'RepairShop BD <onboarding@resend.dev>', // Should use verified domain in prod
                to,
                subject,
                html,
            });
            console.log(`Email sent to ${to} for ticket ${ticketId}`);
        }
    } catch (error) {
        console.error('Failed to send email:', error);
        // Don't block flow if email fails
    }
}
