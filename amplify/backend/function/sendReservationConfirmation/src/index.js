'use strict';

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const sesClient = new SESClient({ region: "ap-northeast-1" });

// 共通レスポンスヘッダーに CORS 用ヘッダーを追加
const responseHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
};

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // プリフライトリクエスト（OPTIONS）の場合は、CORS ヘッダー付きで 200 を返す
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ message: "Preflight check successful" })
    };
  }

  // リクエストボディの解析
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return {
      statusCode: 400,
      headers: responseHeaders,
      body: JSON.stringify({ error: "Invalid JSON in request body" })
    };
  }

  // リクエストボディから各パラメータを取得
  const clientName    = body.clientName || '';
  const email         = body.email || body.clientEmail || '';
  const reservationId = body.reservationId || '';
  const date          = body.reservationDate || '';
  const startTime     = body.startTime || '';
  const endTime       = body.endTime || '';
  // questionnaireLink が指定されていない場合はデフォルトの URL を構築
  const questionnaireUrl = body.questionnaireLink || `https://reservation.manary.care/questionnaire/${reservationId}`;

  const subject = "【予約確認】ご予約ありがとうございます";
  const bodyText =
    `こんにちは ${clientName},\n\n` +
    `ご予約ありがとうございます。\n` +
    `予約日時: ${date} ${startTime} - ${endTime}\n\n` +
    `以下のリンクから問診票をご記入ください:\n` +
    `${questionnaireUrl}\n\n` +
    `※このメールは、配信専用のアドレスで配信されています。 \n` +
    `このメールに返信されても、返信内容の確認およびご返答ができません。 \n` +
    `あらかじめご了承ください。問い合わせは各施設にお願いします。\n`;

  // SES 送信用パラメータ
  const params = {
    Destination: {
      ToAddresses: [ email ]
    },
    Message: {
      Body: {
        Text: { Data: bodyText, Charset: "UTF-8" }
      },
      Subject: { Data: subject, Charset: "UTF-8" }
    },
    Source: "noreply@manary.care"
  };

  try {
    // AWS SDK v3 の送信方法
    await sesClient.send(new SendEmailCommand(params));
    console.log(`Email sent to: ${email}`);
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({ message: "Email sent successfully" })
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      headers: responseHeaders,
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
