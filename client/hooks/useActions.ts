import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import actionsCreators from "../store/actions-creators"

//Задача данного хука вызывать action-creators без dispatch, как обычные функции
export const useActions = () => {
    const dispatch = useDispatch()
    //Параметром передаем action-creators, dispatch
    return bindActionCreators(actionsCreators, dispatch)
}