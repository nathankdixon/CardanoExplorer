import { groupTokensByPolicyId } from "../pages/test/groupTokensByPolicyId";

describe("groupTokensByPolicyId", () => {
  test("groups token objects by policy Id", () => {
    const tokenList = [
      { name: "Token1", policy_id: "1" },
      { name: "Token2", policy_id: "2" },
      { name: "Token3", policy_id: "1" },
      { name: "Token4", policy_id: "3" },
      { name: "Token5", policy_id: "1" },
      { name: "Token6", policy_id: "1" },
      { name: "Token7", policy_id: "2" },
      { name: "Token8", policy_id: "2" },
    ];

    const expected = {
      "1": [
        { name: "Token1", policy_id: "1" },
        { name: "Token3", policy_id: "1" },
        { name: "Token5", policy_id: "1" },
        { name: "Token6", policy_id: "1" },
      ],
      "2": [
        { name: "Token2", policy_id: "2" },
        { name: "Token7", policy_id: "2" },
        { name: "Token8", policy_id: "2" },
      ],
      "3": [{ name: "Token4", policy_id: "3" }],
    };

    expect(groupTokensByPolicyId(tokenList)).toEqual(expected);
  });

  // Add more tests here if needed...
});
