package mbdsp7.toky.miora.heggy

import grails.gorm.transactions.Transactional

import javax.crypto.Cipher
import javax.crypto.spec.SecretKeySpec
import java.security.Key
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

@Transactional
class PasswordService {
    String getEncodedPassword(String key) {
        byte[] uniqueKey = key.getBytes();
        byte[] hash = null;
        try {
            hash = MessageDigest.getInstance("MD5").digest(uniqueKey);
        } catch (NoSuchAlgorithmException e) {
            throw new Error("no MD5 support in this VM");
        }
        StringBuffer hashString = new StringBuffer();
        for ( int i = 0; i < hash.length; ++i ) {
            String hex = Integer.toHexString(hash[i]);
            if ( hex.length() == 1 ) {
                hashString.append('0');
                hashString.append(hex.charAt(hex.length()-1));
            } else {
                hashString.append(hex.substring(hex.length()-2));
            }
        }
        return hashString.toString();
    }
     boolean testPassword(String clearTextTestPassword,
                                       String encodedActualPassword) throws NoSuchAlgorithmException
    {
        String encodedTestPassword = this.getEncodedPassword(
                clearTextTestPassword);

        return (encodedTestPassword.equals(encodedActualPassword));
    }

}
