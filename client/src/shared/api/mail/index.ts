import { IMailSendOtpDto, IMailSendOtpResDto } from "src/shared/interfaces";
import { iamApi } from "../main";

export const mailApi = iamApi.injectEndpoints({
    endpoints: (builder) => ({
        sendOtp: builder.mutation<IMailSendOtpResDto, IMailSendOtpDto>({
            query: (data) => ({
                url: "/mail/send-otp",
                method: "POST",
                body: data,
            }),
        }),
    }),
});
