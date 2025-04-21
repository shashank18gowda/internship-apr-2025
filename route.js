import studentApiHandler from "./src/controllers/manageStudent/apiHandler.js";
import authApiHandler from "./src/controllers/auth/apiHandler.js";


const routes = (app) => {
    
    app.use("/api/student", studentApiHandler);
    app.use("/api/auth", authApiHandler);

    

    
};

export default routes;
