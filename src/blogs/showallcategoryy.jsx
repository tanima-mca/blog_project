// import React, { useState, useEffect } from "react";
// import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
// import axiosInstance from "../../api/axios"; 
// import { endPoints } from "../../api/endpoints"; 

// function ShowallCategoryy() {
//   const [categories, setCategories] = useState([]); 
//   const [selectedCategory, setSelectedCategory] = useState(null); 

    
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get(endPoints.allBlogs.showallcategory);
//         if (response.data && response.data.data) {
//           setCategories(response.data.data);
//           setSelectedCategory(response.data.data[0]); 
//         } else {
//           console.error("No categories found in the response.");
//         }
//       } catch (error) {
//         console.log("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

 
//   const handleCategoryClick = async (categoryId) => {
//     try {
//       const response = await axiosInstance.get(endPoints.allBlogs.categorypost + categoryId);
//       if (response.data) {
//         setSelectedCategory(response.data);
//       } else {
//         console.error("No category details found in the response.");
//       }
//     } catch (error) {
//       console.log("Error fetching category details:", error);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
     
//       <Box
//         sx={{
//           width: "250px",
//           backgroundColor: "#f5f5f5",
//           borderRight: "1px solid #ddd",
//           padding: 2,
//           overflowY: "auto",
//         }}
//       >
//         <Typography variant="h5" sx={{ marginBottom: 2 }}>
//           All Categories
//         </Typography>
//         <List>
//           {categories.length > 0 ? (
//             categories.map((category) => (
//               <ListItem
//                 button
//                 key={category._id}
//                 onClick={() => handleCategoryClick(category._id)} 
//                 sx={{
//                   "&:hover": { backgroundColor: "#e0e0e0" },
//                   backgroundColor:
//                     selectedCategory && selectedCategory._id === category._id
//                       ? "#ddd"
//                       : "transparent",
//                 }}
//               >
//                 <ListItemText primary={category.category} />
//               </ListItem>
//             ))
//           ) : (
//             <ListItem>
//               <ListItemText primary="No categories available" />
//             </ListItem>
//           )}
//         </List>
//       </Box>

      
//       <Box sx={{ flex: 1, padding: 3 }}>
//         {selectedCategory ? (
//           <>
//             <Typography variant="h6" sx={{ marginBottom: 2 }}>
//               {selectedCategory.category}
//             </Typography>
//             <Typography variant="body1">
//               {selectedCategory.description ||"no description"}
//             </Typography>
//           </>
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             Select a category to view details.
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default ShowallCategoryy;



import React, { useState, useEffect } from "react";
import { Typography, Box, List, ListItem, ListItemText, Grid, Card, CardContent } from "@mui/material";
import axiosInstance from "../../api/axios";
import { endPoints } from "../../api/endpoints";

function ShowallCategoryy() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryPosts, setCategoryPosts] = useState([]); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(endPoints.allBlogs.showallcategory);
        if (response.data.data) {
          setCategories(response.data.data);
          setSelectedCategory(response.data.data[0]); 
        } else {
          console.error("No categories found in the response.");
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryClick = async (id) => {
    try {
      const response = await axiosInstance.get(endPoints.allBlogs.categorypost + id);
      if (response.data.data) {
        setSelectedCategory(categories.find((category) => category._id === id));
        setCategoryPosts(response.data.data); 
      } else {
        setCategoryPosts([]); 
      }
    } catch (error) {
      console.log("Error fetching category posts:", error);
    }
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          All Categories
        </Typography>
        <List>
          {categories.length > 0 ? (
            categories.map((category) => (
              <ListItem
                button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                sx={{
                  "&:hover": { backgroundColor: "#e0e0e0" },
                  backgroundColor:
                    selectedCategory && selectedCategory._id === category._id
                      ? "#ddd"
                      : "transparent",
                }}
              >
                <ListItemText primary={category.category} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No categories available" />
            </ListItem>
          )}
        </List>
      </Box>

      
      <Box sx={{ flex: 1, padding: 3, overflowY: "auto" }}>
        {selectedCategory ? (
          <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {selectedCategory.category}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Posts in {selectedCategory.category}:
            </Typography>
            <Grid container spacing={3}>
              {categoryPosts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{post.title}</Typography>
                      <Typography  dangerouslySetInnerHTML={{ __html: `${post.postText}`.slice(0, 300).concat("...") }}></Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Select a category to view details.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ShowallCategoryy;
