import React, {useEffect, useState} from "react";
import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Icon,
    IconButton,
} from "@mui/material";
import clsx from "clsx";

/*
  upload components preview the image if the uploaded file is any kind of image.
  this components give u the base64 form of the uploaded file and even the text format of it.
*/

const MyUpload = ({formik, inputData}) => {
    const {name, label, accept, required, disabled, ...rest} = inputData;
    const {values, touched, errors, setFieldValue} = formik;
    const error = touched[name] && errors[name];
    const [loader, setLoader] = useState(false);
    const [img, setImg] = useState();
    let fileReader;

    const handleChange = (file) => {
        if (/\.(jpe?g|png|gif|webp)$/i.test(file.name)) previewImage(file);
        // if u want the base64 form of ur file
        getBase64(file);
        setFieldValue(name, file);

        fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onloadstart = () => setLoader(true);
        fileReader.onloadend = handleFileRead;
        fileReader.onerror = (error) => {
            console.error("Error: ", error);
        };
    };

    const previewImage = (file) => {
        let reader = new FileReader();
        reader.addEventListener(
            "load",
            (e) => {
                return;
                // @ts-ignore
                // return setImg(
                //     // @ts-ignore
                //     <>
                //       // @ts-ignore
                //       <img src={e.target?.result} title={file.name} alt={file.name}/>
                //     </>
                // );
            },
            false
        );
        reader.readAsDataURL(file);
    };

    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log("base64:", reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const handleFileRead = (e) => {
        const content = fileReader.result;
        setLoader(false);
        console.log("content of the file:", content);
    };

    return (
        <FormControl
            variant="outlined"
            className={clsx("flex flex-col justify-center", rest?.className ?? "")}
            disabled={disabled}
            required={required}
            error={!!error}
        >
            <label htmlFor={name}>
                <input
                    className="hidden"
                    type="file"
                    name={name}
                    id={name}
                    accept={accept ?? "*.any"}
                    onChange={(event) => {
                        handleChange(event.target.files[0]);
                    }}
                    {...rest}
                />
                <Button
                    className="rounded-8 py-10 w-full"
                    variant="outlined"
                    component="span"
                >
                    {loader ? (
                        <CircularProgress/>
                    ) : img ? (
                        <>
                            {img}
                            <IconButton
                                style={{position: "absolute", top: "1px", left: "1px"}}
                            >
                                <Icon className="text-red-700">delete</Icon>
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Icon className="action mx-6">cloud_upload</Icon>
                            {values[name]?.name ? (
                                <>
                                    <IconButton
                                        style={{position: "absolute", top: "1px", left: "1px"}}
                                    >
                                        <Icon className="text-red-700">delete</Icon>
                                    </IconButton>
                                    {values[name]?.name}
                                </>
                            ) : (
                                label
                            )}
                        </>
                    )}
                </Button>
            </label>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
};

export default MyUpload;
