import constants from "../../helpers/constants.js"
import makeRegisterEntity from "../../entities/user/register.js"
import { hash } from "../../helpers/bcrypt.js"
import { BadRequestError, UniqueConstraintError } from "../../helpers/errors.js"
import makeAuditLog from "../../entities/user/audit-log.js"
import makeProfileEntity from "../../entities/profile/profile.js"
import { saveAuditLogQuery } from "../../database/audit-log.js"
import { savePathsQuery } from "../../database/paths.js"
import { paths } from "../../statics/paths.js";

/**
 * @author Jacob
 * @description checks if email address exists
 * @description hash password with salt
 * @description saves to auth db
 * @param - auth entity payload, refer to "../../entities/auth/auth.js" for payload validation
 * @returns - created auth entity
*/
export default function makeRegister({
  saveUser,
  getUserQuery,
  getUserByEmailQuery,
  saveProfile,
  insertUserProfile
}) {
  return async function register(registerInfo) {
    // ============= @STEP 1 =============
    // Create user payload
    if (!registerInfo) throw new BadRequestError(constants.BAD_REQUEST_NO_POST_BODY)
    const registerEntity = makeRegisterEntity(registerInfo)
    const user = await getUserByEmailQuery(registerEntity.email)
    if (user) throw new UniqueConstraintError(constants.EXISTING_EMAIL)
    const hashedPassword = await hash({ plainPassword: registerEntity.password })
    const hashedAuth = {
      ...registerEntity,
      paymentDetails: {},
      password: hashedPassword
    };

    
    
    // ============= @STEP 2 =============
    // Store / Register User
    const registerResult = await saveUser(hashedAuth)

    // ============= @STEP 3 ===========
    // Get user by id
    const userResult = await getUserQuery({
      userId: registerResult.insertedId
    });

    // ============= @STEP 4 =============
    // Store / Create a Profile for the User
    const profileResult = await saveProfile(
      makeProfileEntity({
        firstName: userResult.firstName,
        lastName: userResult.lastName,
        awards: null,
        role: 1,
        hourlyRate: null,
        sessions: [],
        spokenLanguages: [],
        intro: null,
        socialMedia: [],
        about: null,
        technologies: [],
        projects: [],
        availabilityStatus: null,
        profileImage: {
          originalImage: registerInfo.originalImage,
          thumbnailImage: registerInfo.thumbnailImage
        },
        reviews: [],
        expertise: [],
        userId: registerResult.insertedId
      })
    )

    // ============= @STEP 5 =============
    // Insert profile_id on the user
    await insertUserProfile({
      userId: registerResult.insertedId,
      profileId: profileResult.insertedId,
    })

    // Create audit log
    await saveAuditLogQuery({
      userId: registerResult.insertedId,
      email: userResult.email,
      firstName: userResult.firstName,
      lastName: userResult.lastName,
      start_test_cnt: 0,
      finished_test_cnt: 0,
      visited_home_page: 0,
      click_buy_pro_membership: 0,
      disagree_membership_waitlist: 0,
      agree_membership_waitlist: 0,
      feedback_msg: []
    });

    // Create paths content
    await savePathsQuery({
      userId: registerResult.insertedId,
      email: userResult.email,
      firstName: userResult.firstName,
      lastName: userResult.lastName,
      profileId: profileResult.insertedId,
      paths
    });

    return {
      ...userResult,
      profileId: profileResult.insertedId
    }
  }
}