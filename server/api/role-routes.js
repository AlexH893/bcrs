/*
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 3 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Session-Routes
; Sources: Getting MEAN with Mongo, Express, Angular, and Node, Second Edition,
*/

var express = require("express");
const router = express.Router();
const BaseResponse = require("../models/base-response.js");
const ErrorResponse = require("../models/error-response");
const Role = require("../models/role.js");
const User = require("../models/user");

/*
 * Create role
 */
router.post("/", async (req, res) => {
  try {
    Role.findOne({ text: req.body.text }, function (err, role) {
      if (err) {
        console.log(err);
        const findRoleMongodbError = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findRoleMongodbError.toObject());
      } else {
        console.log(role);

        if (!role) {
          const newRole = {
            text: req.body.text,
          };

          Role.create(newRole, function (err, role) {
            if (err) {
              console.log(err);
              const createRoleMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(createRoleMongodbErrorResponse.toObject());
            } else {
              console.log(role);
              const createRoleResponse = new BaseResponse(
                "200",
                "Query success",
                role
              );
              res.json(createRoleResponse.toObject());
            }
          });
        } else {
          console.log(`Role: ${req.body.text} already exists!`);
          const roleAlreadyExists = new ErrorResponse(
            400,
            `Role '${req.body.text}' already exists!`
          );
          res.status(400).send(roleAlreadyExists.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});

/*
 * findAllRoles()
 */

router.get("/", async (req, res) => {
  try {
    Role.find({})
      .where("isDisabled")
      .equals(false)
      .exec(function (err, roles) {
        if (err) {
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(
            "500",
            "internal server error",
            err
          );
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        } else {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(
            "200",
            "query success",
            roles
          );
          res.json(findAllRolesResponse.toObject());
        }
      });
  } catch (e) {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(
      "500",
      "internal server error",
      e.message
    );
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});

/*
 * findRolesById
 */
router.get("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const findRoleByIdMongodbErrorResponse = new ErrorResponse(
          "500",
          "internal server error",
          err
        );
        res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        const findRoleByIdResponse = new BaseResponse(
          "200",
          "query successful",
          role
        );
        res.json(findRoleByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new ErrorResponse(
      "500",
      "internal server error",
      e.message
    );
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
});

/*
 * updateRole API
 */
router.put("/:roleId", async (req, res) => {
  try {
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const updateRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "internal server error",
          err
        );
        res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);

        // This is where we are updating the role
        role.set({ text: req.body.text });

        // Now we save the new role
        role.save(function (err, updatedRole) {
          if (err) {
            console.log(err);
            const updatedRoleMongodbErrorResponse = new ErrorResponse(
              "500",
              "internal server error",
              err
            );
            res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
          } else {
            console.log(updatedRole);
            const updatedRoleResponse = new BaseResponse(
              "200",
              "query success",
              updatedRole
            );
            res.json(updatedRoleResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const updatedRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "internal server error",
      e.message
    );
    res.status(500).send(updatedRoleCatchErrorResponse.toObject());
  }
});

/*
 * deleteRole API
 */
router.delete("/:roleId", async (req, res) => {
  try {
    // Finding role by it's ID
    Role.findOne({ _id: req.params.roleId }, function (err, role) {
      if (err) {
        console.log(err);
        const deleteRoleMongodbErrorResponse = new ErrorResponse(
          "500",
          "Internal server error",
          err
        );
        res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
      } else {
        console.log(role);
        // Aggregate query - process multiple documents and return computed results
        User.aggregate(
          [
            {
              $lookup: {
                from: "roles",
                localField: "role.role",
                foreignField: "text",
                as: "userRoles",
              },
            },
            {
              $match: {
                "userRoles.text": role.text,
              },
            },
          ],
          function (err, users) {
            console.log(users);
            if (err) {
              console.log(err);
              const usersMongodbErrorResponse = new ErrorResponse(
                "500",
                "Internal server error",
                err
              );
              res.status(500).send(usersMongodbErrorResponse.toObject());
            } else {
              // Here is where we're checking to see if the role is currently being used
              if (users.length > 0) {
                console.log(
                  `Role <${role.text}> is already in use and cannot be deleted`
                );
                const userRoleAlreadyInUseResponse = new BaseResponse(
                  "400",
                  `Role '${role.text}' is in use.`,
                  role
                );
                res.status(400).send(userRoleAlreadyInUseResponse.toObject());
              } else {
                console.log(
                  `Role <${role.text}> is not an active role and can be safely removed`
                );
                role.set({ isDisabled: true });
                role.save(function (err, updatedRole) {
                  if (err) {
                    console.log(err);
                    const updatedRoleMongodbErrorResponse = new ErrorResponse(
                      "500",
                      "Internal server error",
                      err
                    );
                    res
                      .status(500)
                      .send(updatedRoleMongodbErrorResponse.toObject());
                  } else {
                    console.log(updatedRole);
                    const roleDeletedResponse = new BaseResponse(
                      "200",
                      `Role '${role.text}' has been removed successfully`,
                      updatedRole
                    );
                    res.json(roleDeletedResponse.toObject());
                  }
                });
              }
            }
          }
        );
      }
    });
  } catch (e) {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
  }
});

module.exports = router;
