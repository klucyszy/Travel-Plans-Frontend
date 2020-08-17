import apiClient from './client';

const controller = "travelplans";

const addTravelPlan = (travelPlan) => apiClient.post(controller, travelPlan);
const getMyTravelPlans  = () => apiClient.get(`${controller}/me`);
const getAllTravelPlans = () => apiClient.get(controller)
const updateTravelPlan = (travelPlan) => apiClient.put(`${controller}/${travelPlan.id}`, { travelPlan } );
const removeTravelPlan = (id) => apiClient.delete(`${controller}/${id}`, { id })

export {
    addTravelPlan,
    getMyTravelPlans,
    getAllTravelPlans,
    updateTravelPlan,
    removeTravelPlan
}