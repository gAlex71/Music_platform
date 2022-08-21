import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store/reducers";

//Получаем обычный хук useSelector, только типизированный
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector