Main app file is in the root of the src folder.
Connection to MongoDB is done with mongoose in the connect file in the utils folder.
App routes are kept in routes file in the root of the src folder.
Routes call controller handlers.
Controllers call function from service files which contain business logic.
Mongoose Schemas and Model creation are located in models files.
Models are used by services to interact with the database.
Schema files are Zod schemas and are used by the validateResources middleware to verify request payloads before they hit the controllers.
Middleware, requireUser, checks if there is a user making the request.
Middleware, deserializeUser, takes the accessToken and verifies it. If it is valid, it takes the decoded object and sets the res.locals.user as the object. If the accessToken is expired, it checks the refreshToken. If the refreshToken is valid it assigns and sets a new accessToken.
In the utils folder there is a file for jwt functions, signJwt, and verifyJwt.
Utils also contains a logger file which is used to log information to the console instead of using console.log.

For me to consider:
DocumentDefinition<Omit<UserDocument,"createdAt" | "updatedAt" | "comparePassword">>
Im wondering (I havent tried it out), is it possible to have a "interface without the timestamps and functions" and a "interface for the schema"? Does this somehow make sense, or would this lead to a bad code-design?
Leading to something like:
export interface UserDocumentBase extends mongoose.Document{documentDetails}
export interface UserDocument extends mongoose.Document, UserDocumentBase {additionalDocumentDetails} (maybe we dont need the additional extends mongoose.Document)

use 201 to create a new user, create sessions
