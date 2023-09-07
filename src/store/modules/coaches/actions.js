export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters['auth/userId'];
        const coachData = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            hourlyRate: data.hourlyRate,
            areas: data.areas
        };

        const token = context.rootGetters['auth/token'];
        const response = await fetch(`https://find-a-coach-819f9-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });
        const responseData = await response.json();

        if (!response.ok) {
            let message = responseData.message || 'Failed to register the coach.';

            if (response.status === 401) {
                message = 'You are not authenticated!';
            }
            const error = new Error(message);
            throw error;
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }

        const response = await fetch(`https://find-a-coach-819f9-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to find the coaches.');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};