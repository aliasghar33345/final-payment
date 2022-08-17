import axios from "axios";

export const payInApi = (params) => {
  const { hash, merchantId, rest } = params;
  return axios({
    method: "post",
    url: `${process.env.NEXT_PUBLIC_P4F_API_ROOT}/1.0/wallet/process/`,
    headers: {
      hash: hash,
      merchantId: merchantId,
    },
    data: rest,
  });
};
