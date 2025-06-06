const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";  
export const API_ENDPOINTS = {
  CREATE_ORDER: `${API_BASE_URL}/orders/create_order`,
  CREATE_PREFERENCE: `${API_BASE_URL}/payments/create_preference`,
  CHANGESTATUSBYPREFID: `${API_BASE_URL}/orders/change_order_status`,
  GET_ORDER: `${API_BASE_URL}/orders/get_order`,
  SEND_ORDER_EMAIL: `${API_BASE_URL}/emails/sendorderemail`,
  GET_PRODUCT: `${API_BASE_URL}/products`,
  GET_PRODUCT_BY_NAME: `${API_BASE_URL}/products/name`,
  GOOGLE_REVIEWS: `${API_BASE_URL}/googleapi`, 
  // Agrega más endpoints según necesites
};