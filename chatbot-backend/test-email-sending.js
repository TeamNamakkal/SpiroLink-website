import dotenv from 'dotenv';
import { sendPaymentConfirmation, sendPaymentFailedEmail, initializeEmailService } from './lib/emailService.js';

dotenv.config();

/**
 * Test email sending to verify NodalWire configuration
 */
async function testEmailSending() {
  console.log('🚀 Starting Email Sending Test\n');
  
  // Initialize email service
  initializeEmailService();
  
  const testPaymentData = {
    email: 'test@example.com', // Change this to your test email
    name: 'Test User',
    amount: '99.99',
    service_type: 'Network Consulting',
    transaction_id: 'test_txn_' + Date.now(),
    payment_id: 'payment_' + Math.random().toString(36).substr(2, 9),
  };

  console.log('📧 Test Payment Data:');
  console.log(JSON.stringify(testPaymentData, null, 2));
  console.log('\n---\n');

  // Test 1: Send payment confirmation
  try {
    console.log('✉️  Test 1: Sending payment confirmation email...');
    await sendPaymentConfirmation(testPaymentData);
    console.log('✅ Payment confirmation email sent successfully!\n');
  } catch (error) {
    console.error('❌ Failed to send payment confirmation:', error.message);
    console.error('Full error:', error);
    console.log('\n');
  }

  // Test 2: Send payment failed email
  try {
    console.log('✉️  Test 2: Sending payment failed email...');
    await sendPaymentFailedEmail({
      ...testPaymentData,
      error_message: 'Card declined - insufficient funds',
    });
    console.log('✅ Payment failed email sent successfully!\n');
  } catch (error) {
    console.error('❌ Failed to send payment failed email:', error.message);
    console.error('Full error:', error);
    console.log('\n');
  }

  console.log('🏁 Email sending test complete!');
  console.log('\n📝 NOTE: If you see 403 errors, your sender email is not verified in Resend.');
  console.log('   Go to https://resend.com → Settings → Domains to add/verify contact@nodalwire.com');
}

testEmailSending().catch(console.error);
