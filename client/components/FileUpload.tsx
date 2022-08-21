import React, { useRef } from "react";

interface FileUploadProps{
    setFile: Function;
    accept: string;
    children: any;
}

const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        //Передаем этот файл 
        setFile(e.target.value[0])
    }

    return(
        //Засчет референса мы можем поместить дочерним элементом любое содержимое
        <div onClick={() => ref.current.click()}>
            <input 
                type="file"
                accept={accept}
                style={{display:"none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    )
}

export default FileUpload