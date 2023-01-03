import AWS from 'aws-sdk';
import { Request, Response } from 'express';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4'
});

export const s3Bucket = new AWS.S3({
  params: { Bucket: process.env.AWS_BUCKET_NAME }
});

export const s3UploadFiles = async (req: Request, res: Response, next: any) => {
  if (req.body.files) {
    const uploadPromises = req.body.files
      .filter((f: string | null) => !!f)
      .map((file: string) => {
        const buffer = Buffer.from(
          file.replace(/^data:image\/\w+;base64,/, ''),
          'base64'
        );
        const data = {
          Body: buffer,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: Date.now().toString(),
          ACL: 'public-read'
        };
        return s3Bucket.upload(data).promise();
      });
    const results = await Promise.all(uploadPromises);
    const locations = results.map((result) => ({ src: result.Location }));
    req.body.files = locations;
    next();
  }
};
