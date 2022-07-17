import * as coreClient from "@azure/core-client";

export const User: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "User",
    modelProperties: {
      createdAt: {
        serializedName: "created_at",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      updatedAt: {
        serializedName: "updated_at",
        required: true,
        type: {
          name: "DateTime"
        }
      },
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid"
        }
      },
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String"
        }
      },
      mobilePhone: {
        serializedName: "mobile_phone",
        required: true,
        type: {
          name: "String"
        }
      },
      verified: {
        serializedName: "verified",
        required: true,
        type: {
          name: "Boolean"
        }
      },
      firstName: {
        serializedName: "first_name",
        required: true,
        type: {
          name: "String"
        }
      },
      lastName: {
        serializedName: "last_name",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
