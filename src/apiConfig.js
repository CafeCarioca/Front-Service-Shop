const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  CREATE_ORDER: `${API_BASE_URL}/orders/create_order`,
  CREATE_PREFERENCE: `${API_BASE_URL}/payments/create_preference`,
  CHANGESTATUSBYPREFID: `${API_BASE_URL}/orders/change_order_status`,

  // Agrega más endpoints según necesites
};