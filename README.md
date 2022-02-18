# heroku-ga

A README.md file with a link to your hosted app, explanations of the technologies used, the approach was taken, unsolved problems, user stories, and notes to yourself so you can come back to your project later in the course and be able to pick up your train of thought, etc.

<!-- ----------------------------------------------------------------------- -->
<!--                            LINK TO LIVE SITE                            -->
<!-- ----------------------------------------------------------------------- -->

https://polar-coast-95609.herokuapp.com/index

<!-- ----------------------------------------------------------------------- -->
<!--                            TECHNOLOGIES USED                            -->
<!-- ----------------------------------------------------------------------- -->

HTML, CSS, NODE.JS, BOOTSTRAP, MONGOOSE,

<!-- ----------------------------------------------------------------------- -->
<!--                             APPROACH TAKEN                              -->
<!-- ----------------------------------------------------------------------- -->

The idea was to make a site where guitarists can buy and sell guitar gear focusing on guitars, amps, pedals.

The site uses one collection for the inventory, which is categorized by if it is an guitar, pedal or amp.
There's a second collection for items that are added onto to the shopping cart.

When a user goes to add a item to sell, the form as a hidden input that adds "user listing" to those listing which are added on by the user. "User listing" is in the schema for the inventory but it's set a not required. So it's only ever gonna be on items which were added by the user through the New Sale Listing form.
This is what we use to grab only those user listings on the "Seller listings" page.

Originally i wanted the shopping cart to pop out of the side of the screen when the cart icon was clicked. It was ment to be able to be seen from any page in the site but i couldn't figure out how to display the cart on that side popup. This sliding popup was then repurposed to be the nav when using the site in mobile mode.

On the home page all the inventory can be seen, but going to the individual categories, the user can view just the guitars or amps or pedals.

When the user clicks on an item they are taken to the show page for said item which features a photo, a video demo, a description, the price and an add to cart button.

There is also a Seller Listings page where the user can see the sale listings they created. They can Edit them from that page or delete the listing.

<!-- ----------------------------------------------------------------------- -->
<!--                    ! ISSUES OR GOALS LEFT TO BE MET                      -->
<!-- ----------------------------------------------------------------------- -->

<!-- ? Want to that users authentication so the cart and listings are saved for users.  -->

<!-- ! Couln't figure out how to sum the total price of the items in the shopping cart.
    My issue was not knowing how to iterate over the items in the collection in mongodb. An array of objects i was able to work with, but i think mongoDB is objects within an object. Couldn't fugure out how to get that info.  -->
