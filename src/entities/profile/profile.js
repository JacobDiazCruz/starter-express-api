import requiredParam from "../../helpers/required-param.js"

/* @Description: Validate each component keys
 * @Security: Layer 2 validation (key fields)
 * @Usage: before sending or retreiving response to DB
 */
export default function makeProfileEntity(data = requiredParam("data")) {
  const validData = validate(data)
  return Object.freeze(validData)

  function validate({
    firstName = requiredParam("firstName"),
    lastName = requiredParam("lastName"),
    role = requiredParam("role"), // 1 for user only, 2 for mentor and user
    awards = requiredParam("awards"), // featured mentor of the week, etc.
    hourlyRate = requiredParam("hourlyRate"), // e.g, P1000 / 30 mins
    intro = requiredParam("intro"),
    availabilityStatus = required("availabilityStatus"),
    sessions = requiredParam("sessions"), // session ids (Array)
    spokenLanguages = requiredParam("spokenLanguages"),
    socialMedia = requiredParam("socialMedia"), // social media links (Array)
    about = requiredParam("about"),
    technologies = requiredParam("technologies"),
    profileImage,
    reviews = requiredParam("reviews"), // mentee reviews (Array)
    expertise = requiredParam("expertise"), // work expertise (Array)
    projects = requiredParam("projects"),
    userId = requiredParam("userId")
  } = {}) {
    // @Note: add type checking validation for additional security layer
    return {
      firstName,
      lastName,
      role,
      availabilityStatus,
      intro,
      awards,
      hourlyRate,
      sessions,
      spokenLanguages,
      socialMedia,
      about,
      technologies,
      profileImage,
      reviews,
      expertise,
      projects,
      userId
    }
  }
}