export default {
    async contactCoach(context, payload) {
        const newRequest = {
            email: payload.email,
            message: payload.message,
        };

        const response = await fetch(`https://find-a-coach-819f9-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send request.');
            throw error;
        }

        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters['auth/userId'];

        const token = context.rootGetters['auth/token'];
        const response = await fetch(`https://find-a-coach-819f9-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`);
        const responseData = await response.json();

        if (!response.ok) {
            let message = responseData.message || 'Failed to register the coach.';

            if (response.status === 401) {
                message = 'You are not authenticated!';
            }
            const error = new Error(message);
            throw error;
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                message: responseData[key].message,
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
};