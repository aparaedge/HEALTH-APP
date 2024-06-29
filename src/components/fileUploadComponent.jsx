// src/FileUploadComponent.js
import React, { useState, useRef, useEffect } from "react";
import shortid from "shortid";
import styles from "./FileUploadComponent.module.css";

const FileUploadComponent = ({ onFileUploadSubmit, onFileChange, clearFiles, setClearFiles }) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [files, setFiles] = useState([]);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const fileSize = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    useEffect(() => {
        if (clearFiles) {
            setFiles([])
            setClearFiles(false); // Reset clearFiles state
        }
    }, [clearFiles, setClearFiles]);

    const handleInputChange = (e) => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push(e.target.files[i]);
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                setSelectedFile((prevValue) => {
                    return [
                        ...prevValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: fileSize(e.target.files[i].size)
                        }
                    ];
                });

                if (onFileChange) {
                    onFileChange(images);
                }
            };
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDeleteSelectedFile = (id) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = selectedFile.filter((data) => data.id !== id);
            setSelectedFile(result);
        }
    };

    const handleFileUploadSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();

        if (selectedFile.length > 0) {
            for (let index = 0; index < selectedFile.length; index++) {
                setFiles((prevValue) => {
                    return [
                        ...prevValue,
                        selectedFile[index]
                    ];
                });
            }
            setSelectedFile([]);
            if (onFileUploadSubmit) {
                onFileUploadSubmit(selectedFile);
            }
        } else {
            onFileUploadSubmit(selectedFile);
        }
    };

    const handleDeleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = files.filter((data) => data.id !== id);
            setFiles(result);
        }
    };

    const openCamera = () => {
        setShowCamera(true);
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((err) => {
                console.error("Error accessing camera: ", err);
                // Handle specific errors or provide user feedback
                alert("Failed to access the camera. Please check your permissions.");
                setShowCamera(false); // Optionally hide camera view
            });
    };
    
    const capturePhoto = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const dataURL = canvasRef.current.toDataURL('image/png');
        const filename = `photo_${shortid.generate()}.png`;
        const file = dataURLtoFile(dataURL, filename);

        setSelectedFile((prevValue) => {
            return [
                ...prevValue,
                {
                    id: shortid.generate(),
                    filename: filename,
                    filetype: "image/png",
                    fileimage: dataURL,
                    datetime: new Date().toLocaleString('en-IN'),
                    filesize: fileSize(file.size)
                }
            ];
        });

        if (onFileChange) {
            onFileChange([file]);
        }

        stopCamera();
    };

    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const stopCamera = () => {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        setShowCamera(false);
    };

    return (
        <div className={styles.fileuploadView}>
            <div className="row justify-content-center m-0">
                <div className="col-md-6">
                    <div className={`card ${styles.mt5}`}>
                        <div className="card-body">
                            <div className={styles.kbDataBox}>
                                <div className={styles.kbModalDataTitle}>
                                    <form onSubmit={handleFileUploadSubmit}>
                                        <div className={styles.kbFileUpload}>
                                            <div className={styles.fileUploadBox}>
                                                <input type="file" id="fileupload" className={styles.fileUploadInput} onChange={handleInputChange} multiple />
                                                <span>Drag and drop or <span className={styles.fileLink}>Choose your files</span></span>
                                            </div>
                                        </div>
                                        <div className={styles.kbAttachBox}>
                                            {selectedFile.map((data) => {
                                                const { id, filename, fileimage, datetime, filesize } = data;
                                                return (
                                                    <div className={styles.fileAtcBox} key={id}>
                                                        {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                            <div className={styles.fileImage}><img src={fileimage} alt="" /></div> :
                                                            <div className={styles.fileImage}><i className="far fa-file-alt"></i></div>
                                                        }
                                                        <div className={styles.fileDetail}>
                                                            <h6>{filename}</h6>
                                                            <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                                            <div className={styles.fileActions}>
                                                                <button type="button" className={styles.fileActionBtn} onClick={() => handleDeleteSelectedFile(id)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {selectedFile.length > 0 && (
                                            <div className={styles.kbButtonsBox}>
                                                <button type="submit" className={`btn btn-primary ${styles.formSubmit}`}>Upload</button>
                                            </div>
                                        )}
                                    </form>
                                    <div className={styles.cameraButtonBox}>
                                        <button className={`btn btn-secondary ${styles.cameraButton}`} onClick={openCamera}>Open Camera</button>
                                    </div>
                                </div>
                                {showCamera && (
                                    <div className={styles.cameraView}>
                                        <video ref={videoRef} className={styles.video}></video>
                                        <canvas ref={canvasRef} className={styles.canvas}></canvas>
                                        <button className={`btn btn-primary ${styles.captureButton}`} onClick={capturePhoto}>Capture</button>
                                        <button className={`btn btn-secondary ${styles.stopButton}`} onClick={stopCamera}>Close Camera</button>
                                    </div>
                                )}
                                {files.length > 0 &&
                                    <div className={styles.kbAttachBox}>
                                        <hr />
                                        {files.map((data, index) => {
                                            const { id, filename, fileimage, datetime, filesize } = data;
                                            return (
                                                <div className={styles.fileAtcBox} key={index}>
                                                    {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                        <div className={styles.fileImage}><img src={fileimage} alt="" /></div> :
                                                        <div className={styles.fileImage}><i className="far fa-file-alt"></i></div>
                                                    }
                                                    <div className={styles.fileDetail}>
                                                        <h6>{filename}</h6>
                                                        <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                        <div className={styles.fileActions}>
                                                            <button className={styles.fileActionBtn} onClick={() => handleDeleteFile(id)}>Delete</button>
                                                            <a href={fileimage} className={styles.fileActionBtn} download={filename}>Download</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploadComponent;
