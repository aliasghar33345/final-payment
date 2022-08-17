import React from 'react'
import axios from 'axios'


export const invoiceGenerator = (method, data) => {
    return axios({
        method: method,
        url: process.env.NEXT_PUBLIC_INVOICE_GENERATE_URL,
        data: data
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const getQrCodeScanner = (data) => {
    return axios({
        method: 'post',
        url: './api/payment',
        data: data
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const paymentStatus = (headers, correlationID) => {
    return axios.get(`https://api.openpix.com.br/api/openpix/v1/charge/${correlationID}`, { headers })
        .then((res) => {
            return res
        }).catch((err) => {
            return err
        })
}

export const payPaymentApi = (data) => {
    return axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_API_PAYMENT,
        data: data,
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const updateStatusInDB = (id, status) => {
    return axios.post('./api/updateStatusInDB', { id, status })
        .then((res) => {
            return res
        }).catch((err) => {
            return err
        })
}