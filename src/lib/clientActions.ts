// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function saveAssessment(assessmentType: string, _data: Record<string, unknown>): Promise<{ success: boolean; id?: string; error?: string }> {
  // Mock implementation for client-side components. Generates a fake ID and returns success.
  const dummyId = `client_${assessmentType}_${Math.random().toString(36).substr(2, 9)}`;

  return { success: true, id: dummyId };
}
