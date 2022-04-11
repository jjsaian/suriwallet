import React from 'react';

const DisplayCredentials = ({cred}) => {
    console.log(cred)
    const { givenName, familyName } = cred.credentialSubject.data;
    const { degree } = cred.credentialSubject.data;
    const { documentType, issuer } = cred.credentialSubject.data.hasIDDocument.hasIDDocument;
    
    return (
        <>
            <p><strong>University:</strong> {issuer}</p>
            <p><strong>Degree:</strong> {degree}</p>
            <p><strong>Document Type:</strong> {documentType}</p>
        </>
    )   
}

export default DisplayCredentials;