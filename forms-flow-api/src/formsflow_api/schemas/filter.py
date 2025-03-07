"""This manages Filter Schema."""

from marshmallow import EXCLUDE, Schema, fields

from .base_schema import AuditDateTimeSchema


class VariableSchema(Schema):
    """This class provides the schema for variable."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields."""

        unknown = EXCLUDE

    name = fields.Str(required=True)
    label = fields.Str()


class FilterSchema(AuditDateTimeSchema):
    """This class manages Filter schema."""

    class Meta:  # pylint: disable=too-few-public-methods
        """Exclude unknown fields in the deserialized output."""

        unknown = EXCLUDE

    id = fields.Int()
    tenant = fields.Str(allow_none=True)
    name = fields.Str()
    description = fields.Str(allow_none=True)
    resource_id = fields.Str(data_key="resourceId", allow_none=True)
    criteria = fields.Dict()
    variables = fields.List(fields.Nested(VariableSchema))
    properties = fields.Dict()
    roles = fields.List(fields.Str())
    users = fields.List(fields.Str())
    status = fields.Str()
    created_by = fields.Str(data_key="createdBy", dump_only=True)
    modified_by = fields.Str(data_key="modifiedBy", dump_only=True)
    task_visible_attributes = fields.Dict(data_key="taskVisibleAttributes")
    isMyTasksEnabled = fields.Bool(load_only=True)
    isTasksForCurrentUserGroupsEnabled = fields.Bool(load_only=True)
    order = fields.Int(data_key="order", allow_none=True)
