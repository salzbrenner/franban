"""empty message

Revision ID: 8595ba2267b1
Revises: 4ba7aac9c306
Create Date: 2019-07-23 08:04:25.458021

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '8595ba2267b1'
down_revision = '4ba7aac9c306'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('boards', 'users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('boards', sa.Column('users', postgresql.ARRAY(sa.INTEGER()), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
