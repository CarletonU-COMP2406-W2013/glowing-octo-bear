**Extensions.md**

    Following the completion of Order Up to the magnitude we had originally set out to complete in our milestones, we had numerous ideas on how we could extend the project. Here is a list of additions we would implement given there was a greater amount of time : 

- Add description and picture for each menu item

- Divide up the database to contain multiple organizations ( currently can have multiple users but they all connect to the same database)

- Make GUI for adding new items to the database (user friendly)

- Add options to each menu item (ie 2 x milk for coffee)

- Create a more in depth sign up page (eg get email and name ..)

- Notification that order has been received

- Try to monetize it in some way

- Server side verification of orders (security) 

- Colour code submitted orders (green kitchen received / red = no) 

- Have quantity of how many of particular item 

- Create a checkout page that totals the bill for each customer

- Cross browser full functionality 

    Focusing on the first three points (the most significant ) it wouldn’t be too difficult to integrate them with Order Up’s current setup. 1) “Add Description and picture for each menu item” would simply require the addition of two more variables (image and description) to the mongo OrderUp database of menu items, along with CSS and HTML to display them properly when each menu item is selected. 2) “Divide up the database to contain multiple organizations” Currently our database is set up for a single Restaurant with many people able to access it. We would like to expand the database to contain subdirectories pertaining to individual organizations. This could be achieved by creating sub directories in mongo based on the organizations name (eg mongo OrderUp/TheWorks/………). New users then would need to be associated with a specific business, so when a user signs in and places an order it sent to the correct directory. 3) “Make GUI for adding new items” Essentially we would like for restaurants to have the ability to create a custom menu, periodically adding or removing items from it. At the moment our database is pre-populated with items (created in serverSetup.js), which for demonstration and testing is nice, but not practical to use. To create this, a third main page would need to be added with data entry fields for each item attribute. The new item could then be pushed to the menu item database, after witch our current code would automatically produce a draggable button in the GUI.