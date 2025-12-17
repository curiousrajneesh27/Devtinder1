import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SES_EMAIL } from "../config/config.js";

const sesClient = new SESClient({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

// Send welcome email
export const sendWelcomeEmail = async (recipientEmail, userName) => {
    const params = {
        Source: AWS_SES_EMAIL,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Subject: {
                Data: "Welcome to DevTinder! 🚀",
                Charset: "UTF-8"
            },
            Body: {
                Html: {
                    Data: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Welcome to DevTinder!</h1>
                                </div>
                                <div class="content">
                                    <h2>Hi ${userName}! 👋</h2>
                                    <p>Thank you for joining DevTinder - the platform where developers connect and collaborate!</p>
                                    <p>Here's what you can do:</p>
                                    <ul>
                                        <li>🔍 Browse and discover amazing developers</li>
                                        <li>🤝 Send connection requests</li>
                                        <li>💬 Chat in real-time with your connections</li>
                                        <li>⭐ Upgrade to Premium for unlimited features</li>
                                    </ul>
                                    <p>Start exploring and building your developer network today!</p>
                                    <a href="${process.env.FRONTEND_URL}/feed" class="button">Explore Developers</a>
                                </div>
                                <div class="footer">
                                    <p>© 2025 DevTinder. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `,
                    Charset: "UTF-8"
                }
            }
        }
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        console.log(`Welcome email sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

// Send subscription confirmation email
export const sendSubscriptionEmail = async (recipientEmail, userName, plan, endDate) => {
    const params = {
        Source: AWS_SES_EMAIL,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Subject: {
                Data: `Your ${plan.charAt(0).toUpperCase() + plan.slice(1)} Subscription is Active! 🎉`,
                Charset: "UTF-8"
            },
            Body: {
                Html: {
                    Data: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                                .highlight { background: #667eea; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
                                .features { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
                                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Subscription Activated!</h1>
                                </div>
                                <div class="content">
                                    <h2>Congratulations ${userName}! 🎉</h2>
                                    <p>Your <strong>${plan.toUpperCase()}</strong> subscription has been activated successfully!</p>
                                    <div class="highlight">
                                        <h3>Valid Until: ${new Date(endDate).toLocaleDateString()}</h3>
                                    </div>
                                    <div class="features">
                                        <h3>Your Premium Features:</h3>
                                        <ul>
                                            <li>✅ Unlimited connection requests</li>
                                            <li>✅ Priority in feed</li>
                                            <li>✅ Advanced search filters</li>
                                            <li>✅ See who viewed your profile</li>
                                            <li>✅ Ad-free experience</li>
                                        </ul>
                                    </div>
                                    <p>Enjoy your premium experience!</p>
                                </div>
                                <div class="footer">
                                    <p>© 2025 DevTinder. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `,
                    Charset: "UTF-8"
                }
            }
        }
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        console.log(`Subscription email sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error sending subscription email:", error);
    }
};

// Send connection request notification email
export const sendConnectionNotificationEmail = async (recipientEmail, recipientName, senderName) => {
    const params = {
        Source: AWS_SES_EMAIL,
        Destination: {
            ToAddresses: [recipientEmail]
        },
        Message: {
            Subject: {
                Data: `${senderName} sent you a connection request! 🤝`,
                Charset: "UTF-8"
            },
            Body: {
                Html: {
                    Data: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <style>
                                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
                                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>New Connection Request! 🤝</h1>
                                </div>
                                <div class="content">
                                    <h2>Hi ${recipientName}!</h2>
                                    <p><strong>${senderName}</strong> wants to connect with you on DevTinder!</p>
                                    <p>Check out their profile and accept the request to start collaborating.</p>
                                    <a href="${process.env.FRONTEND_URL}/requests" class="button">View Requests</a>
                                </div>
                                <div class="footer">
                                    <p>© 2025 DevTinder. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `,
                    Charset: "UTF-8"
                }
            }
        }
    };

    try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
        console.log(`Connection notification email sent to ${recipientEmail}`);
    } catch (error) {
        console.error("Error sending connection notification email:", error);
    }
};
