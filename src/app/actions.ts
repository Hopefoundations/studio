'use server';

import { matchVolunteersToRequests, MatchVolunteersToRequestsInput, MatchVolunteersToRequestsOutput } from '@/ai/flows/match-volunteers-to-requests';

type ActionResult = {
    success: boolean;
    data?: MatchVolunteersToRequestsOutput;
    error?: string;
}

export async function findVolunteerForRequest(input: MatchVolunteersToRequestsInput): Promise<ActionResult> {
    try {
        const result = await matchVolunteersToRequests(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error in findVolunteerForRequest:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "An unknown error occurred while matching volunteer." };
    }
}
