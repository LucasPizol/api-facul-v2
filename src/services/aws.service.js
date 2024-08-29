const {
  SNSClient,
  PublishCommand,
  CheckIfPhoneNumberIsOptedOutCommand,
} = require("@aws-sdk/client-sns");
const { formatPhone } = require("../utils/format-phone");
const { BadRequestException } = require("../routes/responses");

class AWSService {
  snsClient;

  constructor() {
    this.snsClient = new SNSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendSMS(message, phoneNumber) {
    const formattedPhone = formatPhone(phoneNumber);

    const isOptedOut = await this.snsClient.send(
      new CheckIfPhoneNumberIsOptedOutCommand({ phoneNumber: formattedPhone })
    );

    if (isOptedOut.isOptedOut)
      throw new BadRequestException(
        "Phone number is opted out, that means it's blocked from receiving SMS"
      );

    const response = await this.snsClient.send(
      new PublishCommand({
        PhoneNumber: formattedPhone,
        Message: message,
      })
    );

    return response;
  }
}

module.exports = { awsService: new AWSService() };
