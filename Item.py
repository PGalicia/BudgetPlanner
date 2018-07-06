class Item:
    def __init__(self, priority, price, allocated_money = 0):

        # Initiate the variables
        self.priority = priority
        self.price = price
        self.allocated_money = allocated_money

        # Add it to the server