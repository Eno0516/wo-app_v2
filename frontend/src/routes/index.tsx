import {userRoutes} from "../user/routes/router"

const routes = [
    ...userRoutes,
    // 増えたらここに足していく
    { path: "*", element: <h1>Not Found</h1> },
];

export default routes;