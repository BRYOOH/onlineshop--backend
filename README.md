## Backend- with mongodb and node
I used the following libraries for the backend
*Initialize a project and create the package. json file*
`npm init`


*Install all the required dependencies*
`npm install express moongose jsonwebtoken multer path cors`

The multer library helps in storage of media online.The backend has an api for posting an image into the product

```
/Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage});
//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
```
 You can post, delete one and get all with the api schemas for a new product.
```app.post('/addproduct', async(req,res)=>{
    //an array of products
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product =new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })

})

//API for deleting Products
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//API for Get all products
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);

})
```
With user, we post information from the signup api and create a token that stores the user data. The token is passed thorough the api for the frontend
```//API for Register the user
app.post('/signup', async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"existing user found with same emailID"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
        
    }
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

//API for login page
app.post('/login',async(req, res)=>{
let user = await Users.findOne({email:req.body.email});
    if(user){
        const checkpass = req.body.password === user.password;
        if(checkpass){
             const data ={
                user:{
                    id:user.id
                }
             }
             const token = jwt.sign(data,'secret_ecom');
             res.json({success:true,token});
        }
        else{ 
            res.json({success:false, errors:"Wrong password"})
        }
    }
    else{
        res.json({success:false, errors:"Wrong user email"})
    }
})
```
The login api checks if the user with same email exists in the database, it also compares the password given. The token is accessed and pushed through the api

