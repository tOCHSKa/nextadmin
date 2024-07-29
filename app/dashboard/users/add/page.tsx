import Image from "next/image";
import styles from "@/ui/dashboard/users/addUser/addUser.module.css";

interface valueProps {
  value: boolean;
}
const AddUserPage: React.FC<valueProps> = ({value}) => {

  return (

    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="username" name="username" required/>
        <input type="email" placeholder="email" name="email" required/>
        <input type="password" placeholder="password" name="password" required/>
        <input type="phone" placeholder="phone" name="phone"/>
        <select name="isAdmin" id="isAdmin">
          <option value="false" defaultValue="false">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value="true" defaultValue="true">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea 
          name="adress" 
          id="adress" 
          rows={16} 
          placeholder="Address">
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    
  )
}

export default AddUserPage