
var expense_per_category=[0,0,0,0,0]
var category_names = ["Food","Travel","Groceries","Entertainment","Others"] ; 
var count = 5
var loop = 0 ; 
var category_loop = 0 ; 


// calling this function at the very start of this program
update_sum();

// event listener functions 
document.getElementsByClassName("submit-button")[0].addEventListener("click" , displaybox);
document.getElementsByClassName("submit-button")[2].addEventListener("click" , display_category_box);

document.getElementsByClassName("submit-button")[1].addEventListener("click" , add_expense);
document.getElementsByClassName("submit-button")[3].addEventListener("click" , add_category);

// appearance and disapperance of boxes
function displaybox() 
{
	ans = document.getElementById("form-table");
	if ( ans.style.display == "none" ) 
	{
		ans.style.display = "block"
	}
	else
	{
		ans.style.display = "none";
	}
}


function display_category_box() 
{
	ans = document.getElementById("create-category-table");
	if ( ans.style.display == "none" ) 
	{
		ans.style.display = "block"
	}
	else
	{
		ans.style.display = "none";
	}
}


function update_sum()
{
	var sum = document.querySelectorAll("#sum");
	for (var i = 0 ; i < sum.length ; i++)
	{
		sum[i].innerHTML = expense_per_category[i]+ " Rupees spent";
	}
} 


function add_expense() 
{
	var amount = document.getElementById("amount").value;
	var date = document.getElementById("date").value;
	var note = document.getElementById("note").value;
	var category = document.getElementById("category").selectedIndex;
	var selected = document.getElementsByTagName("option" )[category].text;

	if (amount && date && note && selected)
	{
		alert("Expense added successfully");
		var table = document.getElementsByTagName("table")[0];
		const new_row = document.createElement("tr");
		new_row.innerHTML = `
			<tr style = border-bottom: 1px solid white ;>
				<td>${amount}</td>
				<td>${selected}</td>
				<td>${date}</td>
				<td>${note}</td>
			</tr>
		`;

		table.appendChild(new_row) ; 

		// updating the values in the category box of submitting the expense table 
		expense_per_category[category ] = parseInt(expense_per_category[category ]) + parseInt(amount); 
		update_sum() ; 


		displaybox();

		// lowering the table based on the sizes of expanse table
		ans = document.getElementById("form-table") ;
		loop += 25 ; 
		ans.style["margin-top"] = parseInt(200+loop).toString()+'px';

	}
	else
	{
		alert("Please enter all details ...")
	}
}


function add_category()
{
	var category = document.getElementById("category-input").value;

	// checks if the entered category name is already present or not 
	if (category_names.includes(category))
	{
		alert("Category name already exists...") ; 
	}

	// checks if it contains only alphabets
	else if (!category.match("^[a-zA-Z]+$"))
	{
		alert("Category name must be in alphabets ...") ;
	} 

	// if category name is valid 
	else if (category)
	{
		alert("Category name added successfully");

		// add the category in the category table 
		var cat_box = document.getElementById("category-box");
		const new_span = document.createElement("span");

		new_span.innerHTML = `
			<span class="title">
				${category} :<span id="sum"></span>
			</span>
			<br>
		`;

		cat_box.appendChild(new_span) ; 

		// lowering the table based on the sizes of category display table
		category_loop += 60 ; 
		cat_box.style["height"] = parseInt(233+category_loop).toString()+'px';
		
		display_category_box() ;

		// updating the expense array and category names array after category addition 
		expense_per_category.push(0) ;
		category_names.push(category ) ; 
		update_sum() ;  

		// add option in the expense table 
		add_option=document.getElementsByClassName("form-input")[1] ;
		const new_option = document.createElement("option");
		new_option.innerHTML = `
			<option value="${expense_per_category.length+1}">${category}</option>
		`;

		add_option.appendChild(new_option) ; 

	}
	else
	{
		alert("Please enter category name ...")
	}
}
