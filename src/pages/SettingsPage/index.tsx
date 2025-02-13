import { useMediaPredicate } from "react-media-hook";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../redux/themeSlice/themeSlice";

type SettingsPageProps = {}
 
const SettingsPage:React.FC<SettingsPageProps> = () => {
    const dispatch = useDispatch();
    const preferredTheme=useMediaPredicate("(prefers-color-scheme:dark)")?"dark":"light";

    return (
        <div>
          <button onClick={() => dispatch(changeTheme("light"))}>Light Mode</button>
          <button onClick={() => dispatch(changeTheme("dark"))}>Dark Mode</button>
          <button onClick={() => dispatch(changeTheme(preferredTheme))}>System Mode</button>
        </div>
    );
}
 
 
export default SettingsPage;