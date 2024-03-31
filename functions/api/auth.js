import {parse} from "cookie";
import {errors, importJWK, jwtVerify} from "jose";

const rawKey = {
  use: "sig",
  kty: "RSA",
  kid: "ins_2eCIzW6vKvIRiRxyrI3PZ5920u1",
  alg: "RS256",
  n: "ySdLfZwSbTmstKH-knYePXx9F7AUtAkUeoOU6Si-nwcZC3ghsWtkrXNIVW3funDWg-21Ig6cxAQ8PFcu1f6pc1p4W273aktROjqkDoARPSO4oaujSu0zG2LVLyz3Pyh2hODCQ7XVzPIQfBfV436fc1UWBPYVfdaYKvXnN23ibjnMwnL6mHxraoGB6lbRNb9ue2Yunj3JL-k-o96o35JxjEBYJ_tgvzrKtwoUE4T1ezRZB-y76bOlq--ur28CSfCWgMORsaLu9056tlSKa3sh1g630M5DFufpktdakgkIXYNawaeF70vctD74LVXYLZ8IStum_Ss860Yh0mCt1Qy3ew",
  e: "AQAB",
};

export const onRequest = async (context) => {
  const cookies = parse(context.request.headers.get("Cookie") || "");
  const jwt = cookies["__session"];

  if (!jwt) {
    return Response.json({}, { status: 401 });
  }

  const key = await importJWK(rawKey);

  try {
    return Response.json(await jwtVerify(jwt, key));
  } catch (error) {
    if (error instanceof errors.JOSEError) {
      return Response.json({}, { status: 401 });
    }
    throw error;
  }
};
