import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import {
  authState,
} from "../../redux/slices/authSlice";

export default function UserInfo() {
  const auth = useSelector(authState);

  return <Typography variant="subtitle1">{auth.currentUser?.name}</Typography>;
}
