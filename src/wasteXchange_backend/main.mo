// Import the required libraries for Motoko
import Debug "mo:base/Debug";
import Array "mo:base/Array";

// Define a type for hospital details
actor {
  type Hospital = {
    id: Nat;
    name: Text;
    location: Text;
    faulty: Bool; // Added to track faulty devices
  };

  // Immutable array to store hospital details
  var hospitalDetails: [Hospital] = [];

  // Function to add hospital details
  public func addHospital(id: Nat, name: Text, location: Text, faulty: Bool): async Text {
    let newHospital = { id = id; name = name; location = location; faulty = faulty };
    hospitalDetails := Array.append<Hospital>(hospitalDetails, [newHospital]);
    return "Hospital details added successfully!";
  };

  // Function to get hospital details by ID
  public func getHospitalById(id: Nat): async ?Hospital {
    return Array.find<Hospital>(hospitalDetails, func (hospital: Hospital) : Bool {
      hospital.id == id
    });
  };

  // Function to retrieve all hospitals
  public func getAllHospitals(): async [Hospital] {
    return hospitalDetails;
  };

  // Function to get the number of smart bins (total hospitals)
  public func getNumberOfSmartBins(): async Nat {
    return Array.size<Hospital>(hospitalDetails);
  };

  // Function to get the number of faulty devices (hospitals with faulty devices)
  public func getNumberOfFaultyDevices(): async Nat {
    return Array.foldLeft<Hospital, Nat>(hospitalDetails, 0, func(acc: Nat, hospital: Hospital): Nat {
      if (hospital.faulty) acc + 1 else acc
    });
  };

  // Function to get the total number of hospitals
  public func getNumberOfHospitals(): async Nat {
    return Array.size<Hospital>(hospitalDetails);
  };
}