
import { fetchProduct, fetchUser } from "@/lib/data";
import { Product } from "@/lib/models";
import styles from "@/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

interface ParamsProps {
  params: {
    id: string;
  };
}

const SingleProductPage: React.FC<ParamsProps> = async ({params}) => {

  const {id} = params;
  const product = await fetchProduct(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/avatar.png"} alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="hidden" name="id" value="" />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Color</label>
          <input
            type="text"
            name="color"
            placeholder= {product.color}
          />
          <label>Size</label>
          <textarea
            name="size"
            placeholder={product.size}
          />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder={product.desc}
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;