import React from 'react';
import jwt from 'jsonwebtoken';

export const getLocalWebToken = () => {
    const userToken = localStorage.getItem('gstInvoice');
    if (!userToken) return null;
    return userToken;
}