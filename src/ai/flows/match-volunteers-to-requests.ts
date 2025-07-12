// use server'
'use server';
/**
 * @fileOverview Matches open donation requests to the nearest available volunteers, considering their current workload.
 *
 * - matchVolunteersToRequests - A function that matches volunteers to requests.
 * - MatchVolunteersToRequestsInput - The input type for the matchVolunteersToRequests function.
 * - MatchVolunteersToRequestsOutput - The return type for the matchVolunteersToRequests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchVolunteersToRequestsInputSchema = z.object({
  requestId: z.string().describe('The ID of the donation request.'),
  requestLocation: z.string().describe('The pickup location of the donation request.'),
  volunteerLocations: z.record(z.string(), z.string()).describe('A map of volunteer IDs to their current locations.'),
  volunteerOngoingPickups: z.record(z.string(), z.number()).describe('A map of volunteer IDs to the number of their ongoing pickups.'),
});

export type MatchVolunteersToRequestsInput = z.infer<typeof MatchVolunteersToRequestsInputSchema>;

const MatchVolunteersToRequestsOutputSchema = z.object({
  volunteerId: z.string().describe('The ID of the matched volunteer.'),
  reason: z.string().describe('Why this volunteer was chosen'),
});

export type MatchVolunteersToRequestsOutput = z.infer<typeof MatchVolunteersToRequestsOutputSchema>;

export async function matchVolunteersToRequests(input: MatchVolunteersToRequestsInput): Promise<MatchVolunteersToRequestsOutput> {
  return matchVolunteersToRequestsFlow(input);
}

const matchVolunteersToRequestsPrompt = ai.definePrompt({
  name: 'matchVolunteersToRequestsPrompt',
  input: {schema: MatchVolunteersToRequestsInputSchema},
  output: {schema: MatchVolunteersToRequestsOutputSchema},
  prompt: `You are a volunteer coordinator. You need to match a donation request to the best available volunteer.

Here are the details of the donation request:
Request ID: {{{requestId}}}
Request Location: {{{requestLocation}}}

Here is the information about available volunteers:
{{#each volunteerLocations as |location volunteerId|}}
Volunteer ID: {{volunteerId}}
Location: {{location}}
Ongoing Pickups: {{lookup ../volunteerOngoingPickups volunteerId}}
{{/each}}

Based on the location of the request and the number of ongoing pickups for each volunteer, choose the best volunteer to assign to the request. Respond with the volunteer's ID and a short reason for choosing them.

Respond in JSON format:
{
  "volunteerId": "volunteerId",
    "reason": "reason"
}
`,
});

const matchVolunteersToRequestsFlow = ai.defineFlow(
  {
    name: 'matchVolunteersToRequestsFlow',
    inputSchema: MatchVolunteersToRequestsInputSchema,
    outputSchema: MatchVolunteersToRequestsOutputSchema,
  },
  async input => {
    const {output} = await matchVolunteersToRequestsPrompt(input);
    return output!;
  }
);
