
import * as express from "express"
import * as cors from "cors"
import  {router} from "./router/routes"
const port = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use(`/`, router)

app.listen(port, () => console.log(`Ready...${port}`))
