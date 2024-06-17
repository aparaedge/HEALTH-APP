// FileUploadComponent.jsx

import React, { useState } from "react";
import shortid from "shortid";
import styles from "./FileUploadComponent.module.css" // Import the CSS module

const FileUploadComponent = ({onFileUploadSubmit, onFileChange}) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [files, setFiles] = useState([]);

    const fileSize = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

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
          console.log("gotcha")
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
            // Call the callback function passed from the parent component
            if (onFileUploadSubmit) {
                onFileUploadSubmit(selectedFile);
            }
        } else {
            onFileUploadSubmit(selectedFile);
            // alert('Please select file');
        }
    };

    const handleDeleteFile = async (id) => {
        if (window.confirm("Are you sure you want to delete this Image?")) {
            const result = files.filter((data) => data.id !== id);
            setFiles(result);
        }
    };

    return (
        <div className={styles.fileuploadView}> {/* Use CSS module classnames */}
            <div className="row justify-content-center m-0">
                <div className="col-md-6">
                    <div className={`card ${styles.mt5}`}> {/* Use CSS module classnames */}
                        <div className="card-body">
                            <div className={styles.kbDataBox}> {/* Use CSS module classnames */}
                                <div className={styles.kbModalDataTitle}> {/* Use CSS module classnames */}
                                 
                                </div>
                                <form onSubmit={handleFileUploadSubmit}>
                                    <div className={styles.kbFileUpload}> {/* Use CSS module classnames */}
                                        <div className={styles.fileUploadBox}> {/* Use CSS module classnames */}
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
                                                        <div className={styles.fileImage}> <img src={fileimage} alt="" /></div> :
                                                        <div className={styles.fileImage}><i className="far fa-file-alt"></i></div>
                                                    }
                                                    <div className={styles.fileDetail}>
                                                        <h6>{filename}</h6>
                                                        <p></p>
                                                        <p><span>Size : {filesize}</span><span className="ml-2">Modified Time : {datetime}</span></p>
                                                        <div className={styles.fileActions}>
                                                            <button type="button" className={styles.fileActionBtn} onClick={() => handleDeleteSelectedFile(id)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.kbButtonsBox}>
                                        <button type="submit" className={`btn btn-primary ${styles.formSubmit}`}>Upload</button>
                                    </div>
                                </form>
                                {files.length > 0 &&
                                    <div className={styles.kbAttachBox}>
                                        <hr />
                                        {files.map((data, index) => {
                                            const { id, filename, fileimage, datetime, filesize } = data;
                                            return (
                                                <div className={styles.fileAtcBox} key={index}>
                                                    {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                        <div className={styles.fileImage}> <img src={fileimage} alt="" /></div> :
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