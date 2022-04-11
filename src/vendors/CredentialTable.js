import React, {useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap'
import {ShareCredential} from '../containers/ShareCredential.js'
const CredentialTable = ({ credentials }) => {
    const [vcData, setVCData] = useState([]);
    
    useEffect(() => {
      const removeProp = (obj, propToDelete) => {
        for (let property in obj) {
          if (obj.hasOwnProperty(property)) {
            if (property === propToDelete) {
              delete obj[property];
            } else if (typeof obj[property] == "object") {
              removeProp(obj[property], propToDelete);
            }
          }
        }
        return obj
      }

      const initialiseVCData = (vcData) => {
        let processedVCData = []
        for (let vc in vcData) {
          processedVCData[vc] = vcData[vc].credential.credentialSubject.data
          processedVCData[vc] = removeProp(processedVCData[vc], '@type')
        }
        return processedVCData
      }

      setVCData(initialiseVCData(credentials))
    }, [credentials])

    const extractEmailFromIDDocument = (cred) => {
      if (cred.hasIDDocument){
        return JSON.parse(cred.hasIDDocument.hasIDDocument.idClass).email
      } else {
        return null
      }
    }

    return <div>
        <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Major</th>
                  <th>Issue Date</th>
                  <th>VC Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  vcData.map((cred, index) => {
                    return (
                      <tr key={index+1}>
                        <th scope='row'>{index+1}</th>
                        <td>{cred.givenName || cred.name}</td>
                        <td>{cred.familyName || '' }</td>
                        <td>{cred.issueDate}</td>
                        <td>Education</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <Button onClick={(e) => {
      e.preventDefault();
      window.location.href='http://localhost:3001/share-credentials?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpbnRlcmFjdGlvblRva2VuIjp7ImNyZWRlbnRpYWxSZXF1aXJlbWVudHMiOlt7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJJRERvY3VtZW50Q3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQU1MQ3JlZGVudGlhbE9yZ2FuaXphdGlvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQU1MQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWNjb3VudENyZWRlbnRpYWxPcmdhbml6YXRpb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkFjY291bnRDcmVkZW50aWFsUGVyc29uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJBZGRyZXNzQ3JlZGVudGlhbE9yZ2FuaXphdGlvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWRkcmVzc0NyZWRlbnRpYWxQZXJzb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkJpbGxPZkxhZGluZ0NyZWRlbnRpYWxWMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkNhcmdvUmVjZWlwdENyZWRlbnRpYWxWMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkNyZWRpdFNjb3JlQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRE9CQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1haWxDcmVkZW50aWFsT3JnYW5pemF0aW9uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJFbWFpbENyZWRlbnRpYWxQZXJzb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkVtcGxveW1lbnRDcmVkZW50aWFsT3JnYW5pemF0aW9uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJFbXBsb3ltZW50Q3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiR2VuZGVyQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiSGVhbHRoUGFzc3BvcnRCdW5kbGVDcmVkZW50aWFsVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJIZWFsdGhQYXNzcG9ydEdlbmVyYWxDcmVkZW50aWFsVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJIZWFsdGhQYXNzcG9ydEltbXVuaXphdGlvbkNyZWRlbnRpYWxWMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIkhlYWx0aFBhc3Nwb3J0T2JzZXJ2YXRpb25DcmVkZW50aWFsVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJJbnN1cmFuY2VBY2NvdW50Q3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiTGVhbkVudGl0eUNyZWRlbnRpYWxPcmdhbml6YXRpb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIk1ldGFDcmVkZW50aWFsT3JnYW5pemF0aW9uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJNZXRhQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiTmFtZUNyZWRlbnRpYWxPcmdhbml6YXRpb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIk5hbWVDcmVkZW50aWFsUGVyc29uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJOYXRJRE51bUNyZWRlbnRpYWxPcmdhbml6YXRpb25WMSJdLCJjb25zdHJhaW50cyI6W119LHsidHlwZSI6WyJWZXJpZmlhYmxlQ3JlZGVudGlhbCIsIk5hdElETnVtQ3JlZGVudGlhbFBlcnNvblYxIl0sImNvbnN0cmFpbnRzIjpbXX0seyJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiUGhvbmVDcmVkZW50aWFsT3JnYW5pemF0aW9uVjEiXSwiY29uc3RyYWludHMiOltdfSx7InR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJQaG9uZUNyZWRlbnRpYWxQZXJzb25WMSJdLCJjb25zdHJhaW50cyI6W119XSwiY2FsbGJhY2tVUkwiOiIifSwiZXhwIjoxNjQ4NjEwNzc5NTAyLCJ0eXAiOiJjcmVkZW50aWFsUmVxdWVzdCIsImp0aSI6IjA1MDczZmUwMDZjZDhhNDciLCJpc3MiOiJkaWQ6ZWxlbTpFaUQ0ZklxS3NyTUYwcTZsaDBwTG43ZnY0TzZRanZKYXI5RWVKRjB4eUd5TGZ3O2VsZW06aW5pdGlhbC1zdGF0ZT1leUp3Y205MFpXTjBaV1FpT2lKbGVVcDJZMGRXZVZsWVVuQmlNalJwVDJsS2FtTnRWbWhrUjFWcFRFTktjbUZYVVdsUGFVbHFZMGhLY0dKWFJubGxVMGx6U1cxR2MxcDVTVFpKYTFaVVRXcFZNbE41U2praUxDSndZWGxzYjJGa0lqb2laWGxLUVZreU9YVmtSMVkwWkVOSk5rbHRhREJrU0VKNlQyazRkbVI2VG5CYVF6VjJZMjFqZG1NeVZtcGtXRXB3WkVocmRtUnFTV2xNUTBwM1pGZEtjMkZYVGt4YVdHdHBUMngwTjBsdGJHdEphbTlwU1ROQ2VXRlhNV2hqYm10cFRFTktNV015Um01YVUwazJTVzVPY0ZveU5YQmliV05wVEVOS01HVllRbXhKYW05cFZUSldhbU5FU1RGT2JYTjRWbTFXZVdGWFduQlpNa1l3WVZjNWRWTXlWalZOYWtGNFQwTkpjMGx1UWpGWmJYaHdXVEIwYkdWVmFHeGxRMGsyU1dwQmVVOVViR2haYlZacVRXMWFhRTlIUm1oTmFteG9UVVJLYTA5VVVtdE5WMVUwV2xST2EwNXFZekZaYlUweVRqSlZNazVFVm0xT1JGVXpUMVJXYTAxcVozaFBSMVV3VDFkTmVrMXFWbTFPYlVsNFQwUlpNVTlUU2psTVNITnBZVmRSYVU5cFNXcGpiVlpxWWpOYWJHTnVhMmxNUTBveFl6SkdibHBUU1RaSmJrcHNXVEk1TWxwWVNqVkphWGRwWkVoc2QxcFRTVFpKYkU1c1dUTkJlVTVVV25KTlZscHNZMjFzYldGWFRtaGtSMngyWW10MGJHVlVTWGROVkdkcFRFTktkMlJYU25OaFYwNU1XbGhzU1ZwWVoybFBhVWwzVFhwUmVFMTZaM2xPYWtVd1RWUmplRTFFUVRSYWFrcHFXbFJuTWxsWFVUSk9lbFUxV2xSYWFFNXRSWGhOVjBWNFdtcG9iRTVFUW1oYVJFcG9Ua1JWTWsxSFZYbGFSRkV6VG0xRk0xbFViR2xPYlZsM1RsUkphV1pXTUhOSmJVWXhaRWRvYkdKdVVuQlpNa1l3WVZjNWRVbHFjR0pKYVU1M1kyMXNkRmxZU2pWSmJEQnpTVzFHZW1NeVZubGtSMngyWW1zeGJHUkhhSFphUTBrMlYzbEphbU5JU25CaVYwWjVaVk5LWkdaUklpd2ljMmxuYm1GMGRYSmxJam9pZFdsNFpXeEZSREZHVjBkNlIyRjRaRTV3UzBOblJFRlBORzE0VG5Wb1ZEZHFaMFIwUWpkaU1WVmxaM0JzV0RacWNXMXVlRVJWVkRFdGVqQXhURkZCVTJGdlZUTlJaVjlPYVY5cGJXZFNaMGh2V0ZkVFFXY2lmUSNwcmltYXJ5In0.b7c54d121da441eae47c09dccae364e0c97e59041ab0880690f8d4d9a7ecec412c5c6246c57e869ec831700c1da62c5ad154c041bbf00472027942b565ac0748';
      }}>Share Credentials</Button>
    </div>
}

export default CredentialTable;