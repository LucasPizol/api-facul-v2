const {
  SNSClient,
  PublishCommand,
  CheckIfPhoneNumberIsOptedOutCommand,
} = require("@aws-sdk/client-sns");
const { formatPhone } = require("../utils/format-phone");
const { BadRequestException } = require("../main/adapters/responses");
const env = require("../main/env");

class AWSService {
  snsClient;

  constructor() {
    this.snsClient = new SNSClient({
      region: env.awsSdk.region,
      credentials: {
        accessKeyId: env.awsSdk.accessKeyId,
        secretAccessKey: env.awsSdk.secretAccessKey,
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
